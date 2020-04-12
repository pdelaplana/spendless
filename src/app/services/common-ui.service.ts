import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonUIService {

  loading: any;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController) { }

  async notify(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async notifyError(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: 'danger',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async presentLoadingPage(message: string = null, duration: number = null) {
    this.loading = await this.loadingController.create({ message, duration });
    return await this.loading.present();
  }

  async dismissLoadingPage() {
    setTimeout(() => {
      if (this.loading !== undefined) {
        return this.loading.dismiss();
      }
    }, 1000);
}
}


