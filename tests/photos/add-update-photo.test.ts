import { StatusCode } from '@constants/http-response-codes';
import { Photo, Photos, UpdatePhoto } from '@services/photos/photos';
import { expect } from 'chai';

describe('Add photos', function () {
  const photos = new Photos();

  let photo: Photo;

  before('Get a photo to use for searching and updates', async function () {
    await photos.getAllPhotos().then((response) => {
      expect(response.status).to.equal(StatusCode.Ok);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      photo = response.data[0];
    });
  });

  describe('Add a photo', function () {
    it('should add a new photo', async function () {
      const newPhoto: Photo = {
        title: 'New Title',
        url: 'New blog details',
        thumbnailUrl: 'test',
        id: 1,
        albumId: 1,
      };

      await photos.addPhoto(newPhoto).then((response) => {
        expect(response.status).to.equal(StatusCode.Created);
        expect(response.data).to.have.property('id');
        const photo = response.data;
        console.log(photo);
      });
    });
  });

  describe('Update a photo', function () {
    it('Should update an existing photo', async function () {
      const photoUpdate: UpdatePhoto = {
        id: photo.id,
        title: 'this is the updated title',
      };

      await photos.updatePhoto(photoUpdate).then((response) => {
        expect(response.status).to.equal(StatusCode.Ok);
        expect(response.data).to.include(photoUpdate);
      });
    });
  });
});
