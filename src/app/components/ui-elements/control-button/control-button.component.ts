import { Component, inject, input, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouteService } from '../../../services/route.service';

@Component({
  selector: 'app-control-button',
  host: { '[class.selected]': 'isSelected()' },
  imports: [NgClass],
  templateUrl: './control-button.component.html',
  styleUrl: './control-button.component.scss'
})
export class ControlButtonComponent {

  private routes = inject(RouteService);

  hasSwitch = input(false);
  isSwitchOn = input(false);
  icon = input('');
  secondIcon = input('');
  textBefore = input('');
  text = input('');
  textAfter = input('');
  label = input('');
  isSelected = input(false);

  iconSrc = computed(() => this.routes.iconRoute(this.icon()));
  secondIconSrc = computed(() => this.routes.iconRoute(this.secondIcon()));

}
