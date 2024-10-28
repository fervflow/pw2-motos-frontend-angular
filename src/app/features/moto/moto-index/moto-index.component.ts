import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Moto } from '../moto.model';
import { MotoService } from '../moto.service';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import {TuiTable} from '@taiga-ui/addon-table';
	import {
	    TuiAutoColorPipe,
	    TuiButton,
	    TuiDropdown,
	    TuiFormatNumberPipe,
	    TuiIcon,
	    TuiInitialsPipe,
	    TuiLink,
	    TuiTitle,
	} from '@taiga-ui/core';
	import {
	    TuiAvatar,
	    TuiBadge,
	    TuiCheckbox,
	    TuiChip,
	    TuiItemsWithMore,
	    TuiProgressBar,
	    TuiRadioList,
	    TuiStatus,
	} from '@taiga-ui/kit';
	import {TuiCell} from '@taiga-ui/layout';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-moto-index',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    TuiFormatNumberPipe,
    FormsModule,
    NgForOf,
    NgIf,
    TuiAutoColorPipe,
    TuiAvatar,
    TuiBadge,
    TuiButton,
    TuiCell,
    TuiCheckbox,
    TuiChip,
    TuiDropdown,
    TuiIcon,
    TuiInitialsPipe,
    TuiItemsWithMore,
    TuiLink,
    TuiProgressBar,
    TuiRadioList,
    TuiStatus,
    TuiTable,
    TuiTitle,
  ],
  templateUrl: './moto-index.component.html',
  styleUrl: './moto-index.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MotoIndexComponent {
  protected readonly sizes = ['l', 'm', 's'] as const;
  protected size = this.sizes[0];
  
  motos: Moto[] = [];
  // motos$: Observable<Moto[]>;

  constructor(private motoService: MotoService) {
    console.log('MOTO INDEX COMPONENT loaded');
  }

  ngOnInit(): void {
    console.log('Fetching data ngOnInit');
    this.motoService.getMotos().subscribe(
      (data: Moto[]) => {
        this.motos = data;
        console.log('Fetched motos:', this.motos);
      },
      (error) => {
        console.error('Error fetching motos:', error);
      }
    );  
    // this.motos$ = this.motoService.getMotos();
  }

  deleteMoto(id: string): void {
    this.motoService.deleteMoto(id).subscribe(() => {
      this.motos = this.motos.filter((moto) => moto._id !== id);
    });
  }

  // protected readonly columns = Object.keys(this.motos[0]);
}
