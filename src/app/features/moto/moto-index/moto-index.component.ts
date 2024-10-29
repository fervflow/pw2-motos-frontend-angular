import { Moto } from '../moto.model';
import { MotoService } from '../moto.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, startWith } from 'rxjs';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { DynamicDialogRef, DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MotoFormComponent } from '../moto-form/moto-form.component';

@Component({
  selector: 'app-moto-index',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    // FormsModule,
    TableModule,
    ButtonModule,
  ],
  templateUrl: './moto-index.component.html',
  styleUrl: './moto-index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService]
})
export class MotoIndexComponent {
  motos$!: Observable<Moto[]>;
  cols!: any[];
  ref: DynamicDialogRef | undefined;

  constructor(private motoService: MotoService, private dialogService: DialogService, private cdr: ChangeDetectorRef) {
    console.log('MOTO INDEX COMPONENT loaded');
    this.loadMotos();
  }

  refreshComponent(): void {
    // this.cdr.markForCheck(); // Use this to mark the component for the next cycle
    // OR
    this.cdr.detectChanges(); // Use this to detect changes immediately
  }

  loadMotos() {
    this.motos$ = this.motoService.getMotos();
    console.log('List of motos fetched');
  }

  ngOnInit(): void {
    this.cols = [
      // { field: '_id', header: 'ID' },
      { field: 'nombre_conductor', header: 'Conductor' },
      { field: 'marca', header: 'Marca' },
      { field: 'modelo', header: 'Modelo' },
      { field: 'ubicacion', header: 'Ubicación' },
    ];
  }

  openMotoForm(id?: string): void {
    this.ref = this.dialogService.open(MotoFormComponent, {
      header: id ? 'Editar Motocicleta' : 'Crear Motocicleta',
      width: '50%',
      data: { id: id },
      closable: true,
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.loadMotos();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  editMoto(id: string) {
    this.openMotoForm(id);
    // this.motoService.getMotoById(id).subscribe({
    //   next: (motoDetails) => {
    //     console.log('Moto details for editing:', motoDetails);
    //     // Logic to open an edit form with motoDetails goes here
    //   },
    //   error: (err) => console.error('Error fetching moto details', err)
    // });
  }

  deleteMoto(id: string): void {
    this.motoService.deleteMoto(id).subscribe(() => {
      this.loadMotos();
    });
  }
}
