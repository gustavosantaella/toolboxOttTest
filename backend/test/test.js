const chai = require('chai');  
const getFiles = require('../src/service');
const http = require("chai-http")
const app = require("../main");
const jsonSchema = require("chai-json-schema")
const { expect } = require('chai');
chai.use(http)
chai.use(jsonSchema)
const url = "http://127.0.0.1:8000"
describe('Array', function () {

      it('get files',  () => {
        chai.request(app)
        .get(`/files/data`)
        .end((err, res) => {
          if(err){
            chai.assert()
          }
     
          expect(res).to.have.status(200)
         expect(res.body).to.be.an("array")
          res.body.forEach(item => {
            expect(item).has.property("file")
            expect(item).has.property("lines")
            item.lines.forEach(line => {
              expect(line).has.property("number")
              expect(line).has.property("text")
              expect(line).has.property("hex")
            })
          })
        })
      });
  });