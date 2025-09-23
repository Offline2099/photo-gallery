import { Component, HostBinding, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-control-button',
  imports: [NgClass],
  templateUrl: './control-button.component.html',
  styleUrl: './control-button.component.scss'
})
export class ControlButtonComponent {

  @HostBinding('class.selected') get _isSelected(): boolean { return this.isSelected() }

  hasSwitch = input<boolean>(false);
  isSwitchOn = input<boolean>(false);
  icon = input<string>('');
  secondIcon = input<string>('');
  textBefore = input<string>('');
  text = input<string>('');
  textAfter = input<string>('');
  label = input<string>('');
  isSelected = input<boolean>(false);

}
