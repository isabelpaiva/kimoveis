import supertest from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../../app';
import { AppDataSource } from '../../../data-source';
import { Address, Category, RealEstate } from '../../../entities';
import { createRealEstateRouteMock, errorsMock, tokenMock } from '../../mocks';

describe('POST /realEstate', () => {
  let connection: DataSource;
  const baseUrl: string = '/realEstate';

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((error) => console.error(error));
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Success: Must be able to create real estates - Admin token - Full body', async () => {
    const { categoryToCreate, ...payload } =
      createRealEstateRouteMock.realEstateComplete;

    const category = await AppDataSource.getRepository(Category).save(
      categoryToCreate
    );

    const response = await supertest(app)
      .post(baseUrl)
      .set('Authorization', `Bearer ${tokenMock.genToken(true, 1)}`)
      .send({ ...payload, categoryId: category.id });

    const expectResults = {
      status: 201,
      expectBody: { ...payload, category },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.expectBody)
    );
  });

  it('Success: Must be able to create real estates - Admin token - Without address number', async () => {
    const { categoryToCreate, address, ...realEstateInfo } =
      createRealEstateRouteMock.realEstateAddressWithoutNumber;

    const { number, ...addressInfo } = address;

    const category = await AppDataSource.getRepository(Category).save(
      categoryToCreate
    );

    const response = await supertest(app)
      .post(baseUrl)
      .set('Authorization', `Bearer ${tokenMock.genToken(true, 1)}`)
      .send({
        ...realEstateInfo,
        address: addressInfo,
        categoryId: category.id,
      });

    const expectResults = {
      status: 201,
      expectBody: { ...realEstateInfo, category },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.expectBody)
    );
  });

  it('Error: Must not be able to create real estates - Admin token - Unique address', async () => {
    const { categoryToCreate, ...payload } =
      createRealEstateRouteMock.realEstateUnique;

    const { address: addressInfo, ...realEstateInfo } = payload;

    const category = await AppDataSource.getRepository(Category).save(
      categoryToCreate
    );

    await AppDataSource.getRepository(Address).save(addressInfo);
    await AppDataSource.getRepository(RealEstate).save(realEstateInfo);

    const response = await supertest(app)
      .post(baseUrl)
      .set('Authorization', `Bearer ${tokenMock.genToken(true, 1)}`)
      .send({ ...payload, categoryId: category.id });

    const expectResults = {
      status: 409,
      expectBody: { message: 'Address already exists' },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(expectResults.expectBody);
  });

  it('Error: Must not be able to create real estates - Admin token - Invalid body', async () => {
    const { categoryToCreate, ...realEstateInfo } =
      createRealEstateRouteMock.realEstateInvalidBody;

    const category = await AppDataSource.getRepository(Category).save(
      categoryToCreate
    );

    const response = await supertest(app)
      .post(baseUrl)
      .set('Authorization', `Bearer ${tokenMock.genToken(true, 1)}`)
      .send({ ...realEstateInfo, categoryId: category.id });

    const expectResults = {
      status: 400,
      expectBody: {
        message: {
          address: [
            'Expected string, received array',
            'String must contain at most 8 character(s)',
            'Expected string, received object',
            'String must contain at most 2 character(s)',
          ],
          size: ['Number must be greater than 0'],
        },
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.expectBody);
  });

  it('Error: Must not be able to create real estates - Admin token - Invalid body 2', async () => {
    const { categoryToCreate, ...realEstateInfo } =
      createRealEstateRouteMock.realEstateInvalidBody2;

    const category = await AppDataSource.getRepository(Category).save(
      categoryToCreate
    );

    const response = await supertest(app)
      .post(baseUrl)
      .set('Authorization', `Bearer ${tokenMock.genToken(true, 1)}`)
      .send({ ...realEstateInfo, categoryId: category.id });

    const expectResults = {
      status: 400,
      expectBody: {
        message: {
          address: ['Required'],
          size: ['Required'],
        },
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.expectBody);
  });

  it('Error: Must be not able to create real estates - User token', async () => {
    const { categoryToCreate, address, ...realEstateInfo } =
      createRealEstateRouteMock.realEstateAddressWithoutNumber;

    const { number, ...addressInfo } = address;

    const category = await AppDataSource.getRepository(Category).save(
      categoryToCreate
    );

    const response = await supertest(app)
      .post(baseUrl)
      .set('Authorization', `Bearer ${tokenMock.genToken(false, 1)}`)
      .send({
        ...realEstateInfo,
        address: addressInfo,
        categoryId: category.id,
      });

    expect(response.status).toBe(errorsMock.forbidden.status);
    expect(response.body).toEqual(errorsMock.forbidden.error);
  });

  it('Error: Must be not able to create real estates - Missing bearer', async () => {
    const { categoryToCreate, address, ...realEstateInfo } =
      createRealEstateRouteMock.realEstateAddressWithoutNumber;

    const { number, ...addressInfo } = address;

    const category = await AppDataSource.getRepository(Category).save(
      categoryToCreate
    );

    const response = await supertest(app)
      .post(baseUrl)
      .send({
        ...realEstateInfo,
        address: addressInfo,
        categoryId: category.id,
      });

    expect(response.status).toBe(errorsMock.missingBearer.status);
    expect(response.body).toEqual(errorsMock.missingBearer.error);
  });

  it('Error: Must be not able to create real estates - Invalid signature', async () => {
    const { categoryToCreate, address, ...realEstateInfo } =
      createRealEstateRouteMock.realEstateAddressWithoutNumber;

    const { number, ...addressInfo } = address;

    const category = await AppDataSource.getRepository(Category).save(
      categoryToCreate
    );

    const response = await supertest(app)
      .post(baseUrl)
      .set('Authorization', `Bearer ${tokenMock.invalidSignature}`)
      .send({
        ...realEstateInfo,
        address: addressInfo,
        categoryId: category.id,
      });

    expect(response.status).toBe(errorsMock.invalidSignature.status);
    expect(response.body).toEqual(errorsMock.invalidSignature.error);
  });

  it('Error: Must be not able to create real estates - JWT malformed', async () => {
    const { categoryToCreate, address, ...realEstateInfo } =
      createRealEstateRouteMock.realEstateAddressWithoutNumber;

    const { number, ...addressInfo } = address;

    const category = await AppDataSource.getRepository(Category).save(
      categoryToCreate
    );

    const response = await supertest(app)
      .post(baseUrl)
      .set('Authorization', `Bearer ${tokenMock.jwtMalformed}`)
      .send({
        ...realEstateInfo,
        address: addressInfo,
        categoryId: category.id,
      });

    expect(response.status).toBe(errorsMock.jwtMalformed.status);
    expect(response.body).toEqual(errorsMock.jwtMalformed.error);
  });
});
