import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/Auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.scss']
})
export class MemberMessageComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private userService: UserService,
              private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages()
  {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid , this.recipientId)
    .pipe(
      tap(messages => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < messages.length; i++)
        {
          if (messages[i].isRead === false && messages[i].recipientId === currentUserId){
            this.userService.markAsRead(currentUserId, messages[i].id);
          }
        }
      })
    )
    .subscribe(messages => {
       this.messages = messages;
    }, error => {
      this.alertifyService.error(error);
    });
  }

  sendMessage(){
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
    .subscribe((message: Message) => {
   this.messages.unshift(message);
      this.newMessage.content = '';
    } , error => {
      this.alertifyService.error(error);
    });
  }

}
