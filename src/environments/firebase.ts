  //>> ng add @angular/fire
  import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from "@angular/fire/compat/storage";
  import { finalize } from "rxjs";

  export class FileUploadFireBase {
    private filePath!: string;
    private checkType: boolean = true;

    public src!: string;
    public percentageChanges!: number;
    public url!: string;
    public status: boolean = false;
    /**
     *
     * @param file là kiểu dữ liệu File hoặc là string
     * @param storage
     */
    constructor(private file: any , private storage: AngularFireStorage) {
      //>> nếu file là 1 url thì sẽ gán luôn src = url đó
      if(typeof file == 'string'){
        this.src = file
        this.url = file
      }else{
        this.filePath = `${this.file.type}/${this.file.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`
        this.srcRendder()
      }
    }
    /**
     * up(action):void : thực hiện quá trình tải ảnh lên fire base
     * @param action : là 1 hàm sẽ khởi động sau khi quá trình up ảnh hoàn tất
     * up() sẽ thực hiện các hành động thêm : cung cấp tỉ lệ % tải lên thông qua thuộc tính percentageChanges,
     * nếu quá trình tải lên hoàn tất, status sẽ chuyển trạng thái là true
    */
    public up(action: any | null): void {
      //>> nếu file là url thì chỉ khởi chạy lại action
      if(this.url){
        this.status = true
        action()
        return
      }
      //>> nếu file là 1 đối tượng File thì sẽ up lên firebase và trả về url sau khi up thành công
      if (this.file && this.checkType) {
        const fileRef: AngularFireStorageReference = this.storage.ref(this.filePath);
        const task: AngularFireUploadTask = this.storage.upload(this.filePath, this.file);
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.url = url
              console.log(url);
              this.status = true;
              action();
            });
          })
        ).subscribe()
        task.percentageChanges().subscribe(
          (per: number | undefined) => { if (per) this.percentageChanges = per }
        )
      } else {
        console.error("File null or not type need");

      }
    }



    /**
     *
     * create a src simulator for file, cant use to display image on the img card
     * tạo đường dẫn src ảo cho file, dùng để hiển thị ảnh cho thẻ img mà không cần phải
     * up trước lên sever để lấy đường dẫn
     */
    srcRendder() {
      if (this.file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string')
            this.src = reader.result
        }
        reader.readAsDataURL(this.file);
      }
    }
    /**
    check typeFile , input is typeFile array (ex: ['image/gif', 'image/jpeg', 'image/png'])
     kiểm tra kiểu dữ liệu, truyền vào là 1 mảng kiểu dữ liệu quy định
    (vi du checkTypes(['image/gif', 'image/jpeg', 'image/png']).up())
     nếu dữ liệu không khớp sẽ không upload file
    */
    public checkTypes(typeFiles: string[]): FileUploadFireBase {
      this.checkType = false
      for (let typeFile of typeFiles) {
        if (this.file.type === typeFile) {
          this.checkType = true
          console.log(this.file.type + ' = ' + typeFile);
        }
      }
      return this;
    }
  }

  /**
   * upFileArray() : void : là hàm tự động tải toàn bộ các file nằm trong array
   * @param fileArray : là 1 mảng các FileUploadFireBase đang có yêu cầu up()
   * @param action : là 1 hàm có hành động sau khi các file up() đã được tải firebase thành công
   */
  export function upFileArray(fileArray: FileUploadFireBase[], action: any): void {
    let action1 = () => {
      for (let file of fileArray) {
        if (file.status == false) return
      }
      action()
    }

    for (let file of fileArray) {
      file.up(action1)
    }
  }
