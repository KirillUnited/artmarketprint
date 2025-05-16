import { client } from './client';

const DOC_TYPE = 'product'; // Replace with the type you want to delete

export async function deleteAllOfType(type = DOC_TYPE) {
  await client.delete({ query: `*[_type == $product]`, params: { product: type } })
    .then((res) => {
      console.log(res, 'All documents deleted successfully!');
    })
    .catch((err) => {
      console.error(err);
    })
}