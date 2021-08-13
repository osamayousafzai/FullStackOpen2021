import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

export const getPhonebook = () => {
  return axios.get(baseUrl)
}

export const createEntry = (newPhonebookEntryObject) => {
  return axios.post(baseUrl, newPhonebookEntryObject)
}

export const deleteEntry = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
};

export const updateEntry = (updatedObject) => {
  return axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
}