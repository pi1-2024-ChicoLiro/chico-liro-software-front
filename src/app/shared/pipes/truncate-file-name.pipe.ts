import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "truncateFileName",
})
export class TruncateFileNamePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    let extension = value.split(".").pop();
    if (value.length <= limit) {
      return value;
    }

    let mainPart = value.substring(0, limit - extension.length - 3);
    return `${mainPart}...${extension}`;
  }
}
