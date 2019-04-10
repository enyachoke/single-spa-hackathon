import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PatientService {
    public v: string = 'custom:(uuid,display,' +
        'identifiers:(identifier,uuid,preferred,location:(uuid,name),' +
        'identifierType:(uuid,name,format,formatDescription,validator)),' +
        'person:(uuid,display,gender,birthdate,dead,age,deathDate,birthdateEstimated,' +
        'causeOfDeath,preferredName:(uuid,preferred,givenName,middleName,familyName),'
        + 'attributes,preferredAddress:(uuid,preferred,address1,address2,cityVillage,longitude,' +
        'stateProvince,latitude,country,postalCode,countyDistrict,address3,address4,address5' +
        ',address6)))';

    apiURL = 'https://ngx.ampath.or.ke/amrs/ws/rest/v1/patient';
    constructor(private httpClient: HttpClient) { }
    fetchpatient(patientUuid) {
        let url = this.apiURL;
        url += '/' + patientUuid;

        const params: HttpParams = new HttpParams()
            .set('v', (this.v));

        return this.httpClient.get(url, {
            params
        });
    }
}
