import { client } from './client.mjs';

export const DOC_TYPE = {
  product: 'product',
  category: 'category',
  post: 'post',
}; // Replace with the type you want to delete

export async function deleteAllOfType(type) {
  const res = await client.delete({ query: '*[_type == $type]', params: { type } });
  console.log(res, 'All documents deleted successfully!');
  return res;
}

export async function deleteCategoryById(categoryId) {
  const res = await client.delete({ query: '*[_type == "category" && _id == $id][0]', params: { id: categoryId } });
  console.log(res, 'Category deleted successfully!');
  return res;
}