it('should list on /frdige/1 GET', function(done) {
  chai.request(server)
    .get('/fridge/1')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
});