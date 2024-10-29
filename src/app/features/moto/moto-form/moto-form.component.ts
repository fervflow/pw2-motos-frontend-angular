import { Component } from '@angular/core';
import { Moto } from '../moto.model';
import { MotoService } from '../moto.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-moto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './moto-form.component.html',
  styleUrl: './moto-form.component.scss'
})
export class MotoFormComponent {
  moto: Moto = {
    nombre_conductor: '',
    marca: '',
    modelo: '',
    placa: '',
    ubicacion: ''
  };

  constructor(
    private motoService: MotoService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.motoService.createMoto(this.moto).subscribe(() => {
      this.router.navigate(['/motos']);
    });
  }
}
