'use strict';

const {request, app, expect} = require('../../index');

const PATH = '/healthcheck';

describe(`GET ${PATH}`, () => {
  it(`should return 200 if server is running`, async () => {
    const result = await request(app).get(PATH);
    expect(result.status).to.eql(200);
  });
},
);
