export class ContributorObject {
    id: number; //unused
    name: string;
    email: string; //unused
    knowledgeScore: number;

    constructor(id: number, name: string,  email: string, knowledgeScore: number
        ){
            this.id = id;
            this.name = name;
            this.email = email;
            this.knowledgeScore = knowledgeScore;
        }
}

export class Link {
    source: number;
    target: number;
    //strength: number;
    constructor(source: number, target: number/*, strength: number*/)
    {
        this.source = source;
        this.target = target;
        //this.strength = strength;
    }
}

export async function mockKnowledgeGraphGETRequest(contributors: number){
    let contributorList: ContributorObject[] = [];
    for (let i = 0; i < contributors; i++)
    {
        contributorList.push(new ContributorObject(i, "developer#"+i.toString(), i.toString().concat("@gmail.com"), i+5));
    }
    let links: Link[] = [];
    for (let i = 0; i < contributors; i++)
    {
        if (i % 2 === 0 && i > 1)
        {
            links.push(new Link(i, i-1));
        }
    }
    let returnObject = {nodes: contributorList, links: links};
    return returnObject;
}







export var knowledgeGraphResponse = {
    "totalLinesInCodebase": 2774+1+7+256,
    "totalFilesInCodebase": 48, //probably wrong
    "contributorList": [
        {
            "id": 0,
            "email": "pfyffe@iu.edu",
            "knowledgeScore": 2774,
            "filesKnown": [
                "DoctorSearchRequest.java",
                "PermissionDeniedExceptionResponse.java",
                "AppointmentService.java",
                "InsurancePackageRepository.java",
                "MessageRepository.java",
                "InvalidLoginExceptionResponse.java",
                "InsurancePackageSearchRequest.java",
                "PatientManagerSpringApplicationTests.java",
                "UserNotFoundException.java",
                "MavenWrapperDownloader.java",
                "InvalidLoginException.java",
                "UserController.java",
                "Doctor.java",
                "InsurancePackage.java",
                "ControllerUtility.java",
                "UserNotFoundExceptionResponse.java",
                "PatientManagerSpringApplication.java",
                "JwtLoginSuccessResponse.java",
                "InsurancePackageAlreadyHeldExceptionResponse.java",
                "Message.java",
                "UserService.java",
                "ErrorMapValidationService.java",
                "ConversationService.java",
                "SecurityConstants.java",
                "SecurityConfig.java",
                "InsurancePackageService.java",
                "ConversationController.java",
                "CustomUserDetailsService.java",
                "AppointmentController.java",
                "UserRepository.java",
                "JwtAuthenticationEntryPoint.java",
                "ConversationRepository.java",
                "Appointment.java",
                "EmailTakenExceptionResponse.java",
                "LoginRequest.java",
                "EmailTakenException.java",
                "User.java",
                "AppointmentRepository.java",
                "PermissionDeniedException.java",
                "InsurancePackageController.java",
                "CustomResponseEntityExceptionHandler.java",
                "Insurer.java",
                "JwtAuthenticationFilter.java",
                "Conversation.java",
                "JwtTokenProvider.java",
                "InsurancePackageAlreadyHeldException.java",
                "Patient.java"
            ]
        },
        {
            "id": 1,
            "email": "fyffep",
            "knowledgeScore": 1,
            "filesKnown": []
        },
        {
            "id": 2,
            "email": "stjpace@iu.edu",
            "knowledgeScore": 7,
            "filesKnown": [
                "Doctor.java",
                "Appointment.java"
            ]
        },
        {
            "id": 3,
            "email": "kianhan97@gmail.com",
            "knowledgeScore": 256,
            "filesKnown": [
                "InsurancePackageController.java",
                "Insurer.java",
                "InsurancePackageService.java",
                "InsurancePackageRepository.java",
                "InsurancePackageSearchRequest.java",
                "InsurancePackage.java",
                "Patient.java"
            ]
        }
    ],
    "links": [
        {
            "source": 0,
            "target": 3,
            "strength": 13
        },
        {
            "source": 0,
            "target": 2,
            "strength": 3
        }
    ]
};




/*{
    "pfyffe@iu.edu": {
        "first": 2774,
        "second": [
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/Insurer.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/repositories/InsurancePackageRepository.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/exceptions/InvalidLoginException.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/services/AppointmentService.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/payload/JwtLoginSuccessResponse.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/exceptions/UserNotFoundExceptionResponse.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/web/ControllerUtility.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/services/ErrorMapValidationService.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/services/ConversationService.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/services/InsurancePackageService.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/web/AppointmentController.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/exceptions/EmailTakenExceptionResponse.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/Conversation.java",
            "patient-manager-spring/src/test/java/com/p565sp21group1/patientmanagerspring/PatientManagerSpringApplicationTests.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/Patient.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/exceptions/InsurancePackageAlreadyHeldExceptionResponse.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/payload/LoginRequest.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/Message.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/User.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/repositories/ConversationRepository.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/repositories/MessageRepository.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/exceptions/InsurancePackageAlreadyHeldException.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/exceptions/EmailTakenException.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/web/ConversationController.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/Appointment.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/exceptions/CustomResponseEntityExceptionHandler.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/payload/DoctorSearchRequest.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/security/SecurityConstants.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/services/UserService.java",
            "patient-manager-spring/.mvn/wrapper/MavenWrapperDownloader.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/exceptions/PermissionDeniedException.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/services/CustomUserDetailsService.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/payload/InsurancePackageSearchRequest.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/security/JwtAuthenticationEntryPoint.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/exceptions/InvalidLoginExceptionResponse.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/exceptions/PermissionDeniedExceptionResponse.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/security/SecurityConfig.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/Doctor.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/repositories/UserRepository.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/PatientManagerSpringApplication.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/security/JwtTokenProvider.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/repositories/AppointmentRepository.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/InsurancePackage.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/exceptions/UserNotFoundException.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/web/UserController.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/security/JwtAuthenticationFilter.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/web/InsurancePackageController.java"
        ]
    },
    "fyffep": {
        "first": 1,
        "second": []
    },
    "stjpace@iu.edu": {
        "first": 7,
        "second": [
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/Doctor.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/Appointment.java"
        ]
    },
    "kianhan97@gmail.com": {
        "first": 256,
        "second": [
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/Insurer.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/repositories/InsurancePackageRepository.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/Patient.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/models/InsurancePackage.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/services/InsurancePackageService.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/payload/InsurancePackageSearchRequest.java",
            "patient-manager-spring/src/main/java/com/p565sp21group1/patientmanagerspring/web/InsurancePackageController.java"
        ]
    }
};*/