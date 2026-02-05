import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private router: Router) {}
  @Input() userData: any;
  @Output() selectionChange = new EventEmitter<string>();
  role: string = '';
  isMobileMenuOpen: boolean = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  ngOnInit() {
    // Navbar burger toggle
    const burgers = Array.from(document.querySelectorAll('.navbar-burger'));

    burgers.forEach((burger: any) => {
      burger.addEventListener('click', () => {
        const target = burger.dataset.target;
        const menu = document.getElementById(target);

        burger.classList.toggle('is-active');
        menu?.classList.toggle('is-active');
      });
    });
  }
  ngOnChanges() {
    if (this.userData) {
      this.role = this.userData.role;
      console.log(this.role);
    }
  }
  orderClick(action: string) {
    this.selectionChange.emit(action);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
