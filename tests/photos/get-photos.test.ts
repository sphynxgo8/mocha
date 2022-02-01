import { StatusCode } from '@constants/http-response-codes';
import { Photo, Photos } from '@services/photos/photos';
import { expect } from 'chai';

describe('Get photos', function () {
  const photos = new Photos();

  let photo: Photo;

  before('Get a blog post to use for searching and updates', async function () {
    await photos.getAllPhotos().then((response) => {
      expect(response.status).to.equal(StatusCode.Ok);
      photo = response.data[0];
    });
  });

  it('should return all photos', async function () {
    await photos.getAllPhotos().then((response) => {
      const photos = response.data;
      // console.log(photos);
      expect(photos).to.be.an('Array');
      photos.forEach((post) => {
        expect(post).to.have.all.keys(['albumId', 'id', 'title', 'url', 'thumbnailUrl']);
      });
      expect(response.status).to.equal(StatusCode.Ok);
    });
  });

  it('should return photo details', async function () {
    await photos.getPhotosById(photo.id).then((response) => {
      const photo = response.data;
      console.log(photo);
      expect(photo).to.be.an('Object');
      expect(photo).to.have.keys(['albumId', 'id', 'title', 'url', 'thumbnailUrl']);
    });
  });

  it('should return page not found error when getting a photo with an invalid photo id', async function () {
    // @ts-expect-error - Ignore type number requirement
    await photos.getPhotosById('error').then((response) => {
      expect(response.status).to.equal(StatusCode.NotFound);
    });
  });
});
