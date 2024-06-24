import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable()
export class UtilsService {
  constructor(private snackbar: MatSnackBar) {}

  public showSnackbar(message: string, type: "success" | "error" | "warning") {
    return this.snackbar.open(message, undefined, {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "right",
      panelClass: this.getSnackbarPannel(type),
    });
  }

  private getSnackbarPannel(type: "success" | "error" | "warning") {
    switch (type) {
      case "success":
        return ["success-snackbar"];
      case "error":
        return ["error-snackbar"];
      case "warning":
        return ["warning-snackbar"];
    }
  }

  public formatFileSize(size: number) {
    const kilobytes = size / 1024;
    const megabytes = kilobytes / 1024;

    if (size < 1000000) {
      return `${kilobytes.toFixed(0)} KB`;
    }

    return `${megabytes.toFixed(1).replace(".", ",")} MB`;
  }
}
