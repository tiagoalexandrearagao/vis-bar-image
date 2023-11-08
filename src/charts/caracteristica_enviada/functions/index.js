export function orderByFilterPosition(params, formattedData) {
  let filterExists = false;
  let arrayPrimary = [];
  let arraySecondary = [];

  console.log("params", params);

  params.data.forEach(function (d) {
    let dimension = d[params.queryResponse.fields.dimensions[0].name]["value"];
    let measure = d[params.queryResponse.fields.measures[0].name]["value"];
    let color = params.config.color_table;

    if (params.details.crossfilters.length > 0) {
      color = setColor(params, dimension);
    }

    formattedData.push({
      dimension: dimension,
      measure: measure,
      color: color,
    });
  });

  //posicionar os elementos filtrodos no topo da lista
  formattedData.forEach(function (d) {
    try {
      if (params.details.crossfilters.length > 0) {
        valueExists(params, d.dimension)
          ? arrayPrimary.push(d)
          : arraySecondary.push(d);
        filterExists = true;
      }
    } catch (error) {}
  });

  if (filterExists) {
    formattedData = [...arrayPrimary, ...arraySecondary];
  }
  return formattedData;
}

export function setColor(params, dim) {
  if (valueExists(params, dim)) {
    return params.config.color_table;
  } else {
    return params.config.color_not_selected;
  }
}

function valueExists(params, dim) {
  let exists = false;
  let filtered = [];
  try {
    filtered = params.details.crossfilters[0].values;
  } catch (error) {}
  try {
    dim = JSON.parse(dim); //remover o \" se existir
  } catch (error) {}

  let crossFilter = pipeExists(filtered);

  if (typeof crossFilter == "object") {
    for (let i = 0; i < crossFilter.length; i++) {
      let tempFilter = crossFilter[i];

      try {
        tempFilter = JSON.parse(tempFilter);
      } catch (error) {}

      console.log("1 - É object - Comparar", dim, tempFilter);

      if (tempFilter == dim) {
        exists = true;
        break;
      }
    }
  } else {
    let tempFilter = crossFilter;

    try {
      tempFilter = JSON.parse(tempFilter);
    } catch (error) {}

    console.log("1 - É string - Comparar", dim, tempFilter);

    if (tempFilter == dim) {
      exists = true;
    }
  }

  console.log("Checando se o termo existe nos filtros", exists);
  return exists;
}

function pipeExists(filter) {
  let newFilter = filter;

  console.log("pipeExists - old filter", filter);

  if (filter[0].includes(" | ")) {
    let tempFilter = JSON.parse(filter[0]);

    tempFilter.replace(/\"/gm, "").replace(/\[/gm, "").replace(/\]/gm, "");

    newFilter = tempFilter.split(" | ");
  }

  console.log("pipeExists - new filter", newFilter);
  return newFilter;
}
