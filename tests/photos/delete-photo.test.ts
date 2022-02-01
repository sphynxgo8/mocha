import { StatusCode } from '@constants/http-response-codes';
import { Photo, Photos } from '@services/photos/photos';
import { expect } from 'chai';

describe('Delete photos', function () {
  const photos = new Photos();

  let photo: Photo;

  before('Get a photo to use for searching and updates', async function () {
    await photos.getAllPhotos().then((response) => {
      expect(response.status).to.equal(StatusCode.Ok);
      photo = response.data[0];
    });
  });

  it('Should remove an existing blog post', async function () {
    await photos.deletePhoto(photo.id).then((response) => {
      expect(response.status).to.equal(StatusCode.Ok);
    });
  });
});
