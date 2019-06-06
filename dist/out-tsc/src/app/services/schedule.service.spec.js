import { TestBed } from '@angular/core/testing';
import { ScheduleService } from './schedule.service';
describe('ScheduleService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ScheduleService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=schedule.service.spec.js.map