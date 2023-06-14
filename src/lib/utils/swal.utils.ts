import Swal, { type SweetAlertIcon } from 'sweetalert2';

export function openToast(title: string, type: SweetAlertIcon, timer = 2000) {
	Swal.fire({
		toast: true,
		position: 'bottom-right',
		icon: type,
		title,
		showConfirmButton: false,
		timer,
		customClass: { title: 'alert__title' }
	});
}
