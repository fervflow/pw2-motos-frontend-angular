import { Component } from '@angular/core';
import { Moto } from '../moto.model';
import { MotoService } from '../moto.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-moto-form',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, DropdownModule, FormsModule, ReactiveFormsModule, ],
  templateUrl: './moto-form.component.html',
  styleUrl: './moto-form.component.scss',
  providers: [DialogService],
})
export class MotoFormComponent {
  // moto: Moto = {
  //   nombre_conductor: '',
  //   marca: '',
  //   modelo: '',
  //   placa: '',
  //   ubicacion: ''
  // };
  motoForm: FormGroup;
  locations = [
    { label: 'POTOSI', value: 'POTOSI' },
    { label: 'TARIJA', value: 'TARIJA' },
    { label: 'COCHABAMBA', value: 'COCHABAMBA' },
    { label: 'LA PAZ', value: 'LA PAZ' },
    { label: 'SANTA CRUZ', value: 'SANTA CRUZ' },
    { label: 'ORURO', value: 'ORURO' },
    { label: 'CHUQUISACA', value: 'CHUQUISACA' },
    { label: 'BENI', value: 'BENI' },
    { label: 'PANDO', value: 'PANDO' }
  ];
  constructor(
    private motoService: MotoService,
    private router: Router,
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.motoForm = this.fb.group({
      _id: [{ value: '', disabled: true }],
      nombre_conductor: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      ubicacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.config.data?.id) {
      this.loadMoto(this.config.data.id);
      console.log('data id:', this.config.data.id);
    }
  }

  loadMoto(id: string): void {
    this.motoService.getMotoById(id).subscribe((moto: Moto) => {
      console.log('moto to populate in FORM:', moto);
      this.motoForm.patchValue(moto);
    });
  }

  saveMoto(): void {
    if (this.motoForm.valid) {
      const motoData = this.motoForm.getRawValue();
      if (this.config.data?.id) {
        this.motoService.updateMoto(this.config.data.id, motoData).subscribe(() => {
          this.ref.close(true); // Close and notify success
        });
      } else {
        this.motoService.createMoto(motoData).subscribe(() => {
          this.ref.close(true);
        });
      }
    }
  }

  closeDialog(): void {
    this.ref.close();
  }

  // onSubmit(): void {
  //   this.motoService.createMoto(this.moto).subscribe(() => {
  //     this.router.navigate(['/motos']);
  //   });
  // }
}
