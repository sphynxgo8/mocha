import { Config } from '@config/config';
import axios, { AxiosResponse } from 'axios';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface UpdatePhoto {
  id: number;
  title: string;
}

export class Photos {
  private readonly baseURL = Config.baseURL;

  // return type is an array of BlogPosts
  async getAllPhotos(): Promise<AxiosResponse<any>> {
    return await axios
      .get(`${this.baseURL}/photos`)
      .then((response) => response)
      .catch((error) => error.response);
  }

  async getPhotosById(id: number): Promise<AxiosResponse<any>> {
    return await axios
      .get(`${this.baseURL}/photos/${id}`)
      .then((response) => response)
      .catch((error) => error.response);
  }

  // return type is an empty object
  async deletePhoto(id: number): Promise<AxiosResponse<Record<string, never>>> {
    return await axios
      .delete(`${this.baseURL}/photos/${id}`)
      .then((response) => response)
      .catch((error) => error.response);
  }

  async addPhoto(post: Photo): Promise<AxiosResponse<Photo>> {
    return await axios
      .post(`${this.baseURL}/photos`, post)
      .then((response) => response)
      .catch((error) => error.response);
  }

  async updatePhoto(post: UpdatePhoto): Promise<AxiosResponse<UpdatePhoto>> {
    const { id, ...update } = post;
    return await axios
      .put(`${this.baseURL}/photos/${id}`, update)
      .then((response) => response)
      .catch((error) => error.response);
  }
}
