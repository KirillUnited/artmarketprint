import {groq} from 'next-sanity';

const materialRows = groq`rows[]{
    size->{_id, id, name, multiplier},
    prices[]{
      printKey,
      priceTable,
    }
  }`;

export const MATERIAL_MATRIX_BY_MATERIAL_ID = groq`
*[_type == "materialPriceMatrix" && material->_id == $materialId][0]{
  _id,
  note,
  material->{_id, id, name},
  ${materialRows}
}
`;

export const MATERIAL_MATRIX_BY_MATERIAL_REF = groq`
*[_type == "materialPriceMatrix" && material._ref == $materialRefId][0]{
  _id,
  note,
  material->{_id, id, name},
  ${materialRows}
}
`;

export const CALCULATOR_MATERIALS_WITH_MATRICES = groq`
*[_type == "calculator" && _id == $calculatorId][0]{
  _id,
  title,
  materials[]->{
    _id, 
    id, 
    name,
    "matrix": *[_type == "materialPriceMatrix" && material._ref == ^._id][0]{
      _id, note,
      ${materialRows}
    }
  }
}
`;
