import {groq} from "next-sanity";

export const MATERIAL_MATRIX_BY_MATERIAL_ID = groq`
*[_type == "materialPriceMatrix" && material->_id == $materialId][0]{
  _id,
  note,
  material->{_id, id, name},
  rows[]{
    size->{_id, id, name, multiplier},
    prices[]{printKey, per100, per1000}
  }
}
`

export const MATERIAL_MATRIX_BY_MATERIAL_REF = groq`
*[_type == "materialPriceMatrix" && material._ref == $materialRefId][0]{
  _id,
  note,
  material->{_id, id, name},
  rows[]{
    size->{_id, id, name, multiplier},
    prices[]{printKey, per100, per1000}
  }
}
`

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
      rows[]{
        size->{_id, id, name, multiplier},
        prices[]{printKey, per100, per1000}
      }
    }
  }
}
`