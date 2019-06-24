import { TestBed } from '@angular/core/testing';
import { LocaldataService } from './localdata.service';
describe('LocaldataService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(LocaldataService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=localdata.service.spec.js.map