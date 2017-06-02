import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';

@Component({
    selector: 'contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css'],
    providers: [ContactService]
})

export class ContactListComponent implements OnInit {

    contacts: Contact[]
    revVideoList: Contact[]
    selectedContact: Contact
    fbVideoURL: string
    fbVideoTag: string
    searchVideo: string


    constructor(private contactService: ContactService) { }

    ngOnInit() {
        this.contactService
            .getContacts()
            .then((contacts: Contact[]) => {
            this.contacts = contacts.map((contact) => {     // fills in default data
                if (!contact.username) { contact.username = 'admin'; }
                if (!contact.vidname) { contact.vidname = ''; }
                if (!contact.videotag) { contact.videotag = ''; }
                if (!contact.fburl) { contact.fburl = ''; }
                if (!contact.embedurl) { contact.embedurl = ''; }
                                
                return contact;
            });
            this.revVideoList = this.contacts.slice().reverse(); // reverse the list
            if (contacts.length > 0) {this.selectedContact = contacts[0]; }
        });
    }

    private getIndexOfContact = (contactId: String) => {
        return this.contacts.findIndex((contact) => {
            return contact._id === contactId;
        });
    }

    selectContact(contact: Contact) {
        this.selectedContact = contact;
        
        if (this.selectedContact !== null) {

            this.fbVideoURL = this.selectedContact.embedurl;
            this.fbVideoTag = this.selectedContact.videotag;

            //  this line of code took me hours to figure out.
            //  It pushes the URL out to contact-list.component.html
        
            var videoElement = document.getElementById("fbURLhtml");  // get the Page element to replace
            videoElement.innerHTML = this.fbVideoURL.valueOf(); // TODO: Need to put some validation here before I display

            videoElement.scrollIntoView({ behavior: 'smooth' });  // get the video into view
        }
        else {
            var linkElement = <HTMLInputElement> document.getElementById("pasteBuf");
            linkElement.value = "*---- VIDEO DELETED ----*";
        }
    }

    createNewContact() {
        var contact : Contact = {
            username: '',
            vidname: '',
            videotag: '',
            fburl: '',
            embedurl: ''
        };

        // By default, a newly-created contact will have the selected state.
        this.selectContact(contact);    // selected contact will be displayed to right
    }

    deleteContact = (contactId: String) => {
        var idx = this.getIndexOfContact(contactId);
        if (idx !== -1) {
            this.contacts.splice(idx, 1);         // deletes 1 element at idx
            this.selectContact(null);
        }
        
        this.revVideoList = this.contacts.slice().reverse(); // reverse the list
        return this.contacts;
    }

    addContact = (contact: Contact) => {
        this.contacts.push(contact);
        this.selectContact(contact);
             
        this.revVideoList = this.contacts.slice().reverse(); // reverse the list
        return this.contacts;
    }

    updateContact = (contact: Contact) => {
        var idx = this.getIndexOfContact(contact._id);
        if (idx !== -1) {
            this.contacts[idx] = contact;
            this.selectContact(contact);
        }
        
        this.revVideoList = this.contacts.slice().reverse(); // reverse the list
        return this.contacts;
    }
    
    // scrolls to the top of the page
    scrollToVideoList() {
        document.getElementById("video-list").scrollIntoView({ behavior: 'smooth' });  // go back to the top
    }
    
    // copy the URL that you can paste into your favorite messaging app
    copyLink2Buffer(){
        var element = <HTMLInputElement> document.getElementById("pasteBuf");
        element.select();
        document.execCommand('copy');
    }
    
}