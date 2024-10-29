import { Moto } from '../moto.model';
import { MotoService } from '../moto.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-moto-index',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './moto-index.component.html',
  styleUrl: './moto-index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MotoIndexComponent implements OnInit {
  protected readonly sizes = ['l', 'm', 's'] as const;
  protected size = this.sizes[0];

  readonly columns = ['nombre_conductor', 'marca', 'modelo', 'placa', 'ubicacion', 'actions'];
  
  // motos: Moto[] = [];
  motos$: Observable<Moto[]>;

  constructor(private motoService: MotoService) {
    console.log('MOTO INDEX COMPONENT loaded');
    this.motos$ = this.motoService.getMotos();
  }

  ngOnInit(): void {
  }

  // deleteMoto(id: string): void {
  //   this.motoService.deleteMoto(id).subscribe(() => {
  //     this.motos = this.motos.filter((moto) => moto._id !== id);
  //   });
  // }
}
