import { Component, OnInit } from '@angular/core';
import { Viddy } from '../viddy';
import { ViddyService } from '../viddy.service';
import { ViddyDetailsComponent } from '../viddy-details/viddy-details.component';

@Component({
    selector: 'viddy-list',
    templateUrl: './viddy-list.component.html',
    styleUrls: ['./viddy-list.component.css'],
    providers: [ViddyService]
})

export class ViddyListComponent implements OnInit {

    viddys: Viddy[]
    revVideoList: Viddy[]
    selectedViddy: Viddy
    fbVideoURL: string
    fbVideoTag: string
    searchVideo: string


    constructor(private viddyService: ViddyService) { }

    ngOnInit() {
        this.viddyService
            .getViddys()
            .then((viddys: Viddy[]) => {
            this.viddys = viddys.map((viddy) => {     // fills in default data
                if (!viddy.username) { viddy.username = 'admin'; }
                if (!viddy.vidname) { viddy.vidname = ''; }
                if (!viddy.videotag) { viddy.videotag = ''; }
                if (!viddy.fburl) { viddy.fburl = ''; }
                if (!viddy.embedurl) { viddy.embedurl = ''; }
                                
                return viddy;
            });
            this.revVideoList = this.viddys.slice().reverse(); // reverse the list
            if (viddys.length > 0) {this.selectedViddy = viddys[0]; }
        });
    }

    private getIndexOfViddy = (viddyId: String) => {
        return this.viddys.findIndex((viddy) => {
            return viddy._id === viddyId;
        });
    }

    selectViddy(viddy: Viddy) {
        this.selectedViddy = viddy;
        
        if (this.selectedViddy !== null) {

            this.fbVideoURL = this.selectedViddy.embedurl;
            this.fbVideoTag = this.selectedViddy.videotag;

            //  this line of code took me hours to figure out.
            //  It pushes the URL out to viddy-list.component.html
        
            var videoElement = document.getElementById("fbURLhtml");  // get the Page element to replace
            videoElement.innerHTML = this.fbVideoURL.valueOf(); // TODO: Need to put some validation here before I display

            videoElement.scrollIntoView({ behavior: 'smooth' });  // get the video into view
        }
        else {
            var linkElement = <HTMLInputElement> document.getElementById("fbURLhtml");
            linkElement.value = "*---- VIDEO DELETED ----*";
        }
    }

    createNewViddy() {
        var viddy : Viddy = {
            username: '',
            vidname: '',
            videotag: '',
            fburl: '',
            embedurl: ''
        };

        // By default, a newly-created viddy will have the selected state.
        this.selectViddy(viddy);    // selected viddy will be displayed to right
    }

    deleteViddy = (viddyId: String) => {
        var idx = this.getIndexOfViddy(viddyId);
        if (idx !== -1) {
            this.viddys.splice(idx, 1);         // deletes 1 element at idx
            this.selectViddy(null);
        }
        
        this.revVideoList = this.viddys.slice().reverse(); // reverse the list
        return this.viddys;
    }

    addViddy = (viddy: Viddy) => {
        this.viddys.push(viddy);
        this.selectViddy(viddy);
             
        this.revVideoList = this.viddys.slice().reverse(); // reverse the list
        return this.viddys;
    }

    updateViddy = (viddy: Viddy) => {
        var idx = this.getIndexOfViddy(viddy._id);
        if (idx !== -1) {
            this.viddys[idx] = viddy;
            this.selectViddy(viddy);
        }
        
        this.revVideoList = this.viddys.slice().reverse(); // reverse the list
        return this.viddys;
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