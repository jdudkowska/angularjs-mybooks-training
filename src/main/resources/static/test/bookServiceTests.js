describe('Warmup tests', function() {
	it('should assert truthy', function() {
		expect(true).toBeTruthy();
	})
});

describe('BookService', function() {
	var bookService, $httpBackend, $rootScope;
	
	beforeEach(module('app'));
	
	beforeEach(inject(function(BookService, _$httpBackend_, _$rootScope_) {
		bookService = BookService;
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
		
	}));
	
	it('[get book] should return promisse as result', function() {
		response = bookService.getBook(1);
		
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	})
	
	it('[add book] should return promisse as result', function() {
		response = bookService.addBook();
		
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	})
	
	it('[update book] should return promisse as result', function() {
		response = bookService.updateBook(1);
		
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	})
	
	it('should get list of books', function() {
		$httpBackend.when('GET', '/api/books').respond(200, [{ id: 1, name: 'Book'}, { id: 2, name: 'Another Book'}]);
		
		responsePromise = bookService.getBooks();
		
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response[0].name).toBe('Book');
			expect(response[1].name).toBe('Another Book');
		});
		
		$httpBackend.flush();
	});
	
	
	it('should get book', function() {
		$httpBackend.when('GET', '/api/books/1').respond(200, {id: 1, name: 'Book'});
		
		responsePromise = bookService.getBook(1);
		
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Book');
		});
		
		$httpBackend.flush();
	});
	
	it('should add book', function() {
		$httpBackend.when('POST', '/api/books').respond(200, {id: 1, name: 'Book'});
		
		responsePromise = bookService.addBook();
		
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Book');
		});
		
		$httpBackend.flush();
	});
	
	it('should edit book', function() {
		$httpBackend.when('PUT', '/api/books/' + '1',{id: 1, name: 'Book'}).respond(200, {id: 1, name: 'Book'});
		responsePromise = bookService.updateBook(1, {id: 1, name: 'Book'});
		
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Book');
		});
		
		$httpBackend.flush();
	});
});