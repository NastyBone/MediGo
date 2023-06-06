import { TestBed } from '@angular/core/testing';
import { ToastModule } from './toast.module';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService, 
      ],
      imports: [ToastModule.forRoot()]
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
