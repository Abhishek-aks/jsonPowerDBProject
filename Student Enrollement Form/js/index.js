var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var dbName = "SCHOOL-DB";
var relName = "STUDENT-TABLE";
var connToken = "90932860|-31949281863412644|90948313";
        
$('#studentrollno').focus();
        
function saveRecNo2LS(jsonObj){
            var lvData = JSON.parse(jsonObj.data);
            localStorage.setItem('recordno',lvData.rec_no);
        }
        function getstudentrollnoasjsonobj(){
        var rollno = $("#studentrollno").val();
        var jsonStr = {
            id: rollno
        };
        return JSON.stringify(jsonStr);
        }
 
function fillData(jsonObj){
            saveRecNo2LS(jsonObj);
            var record= JSON.parse(jsonObj.data).record;
            $('#studentfullName').val(record.name);
             $('#studentclass').val(record.class);
            $('#studentbirthdate').val(record.birthdate);
            $('#studentaddress').val(record.address);
            $('#studentEnrollmentdate').val(record.enrollmentdate);
            
        }

function resetStudent() {
            $("#studentrollno").val("");
            $("#studentfullName").val("");
            $("#studentclass").val("");
            $("#studentbirthdate").val("");
            $("#studentaddress").val("");
            $("#studentEnrollmentdate").val("");
            $("#studentrollno").prop("disabled",false);
            $("#save").prop("disabled",true);
            $("#update").prop("disabled",true);
            $("#reset").prop("disabled",true);
            $("#studentrollno").focus();
        }
function validateData() {
            var studentrollno = $("#studentrollno").val();
            if (studentrollno === "") {
                alert("Student Roll no Required");
                $("#studentrollno").focus();
                return "";
            }
            var studentfullName = $("#studentfullName").val();
            if (studentfullName === "") {
                alert("Student Name is Required for validation");
                $("#studentfullName").focus();
                return "";
            }
            var studentclass = $("#studentclass").val();
            if (studentclass === "") {
                alert("student class is Required for validation");
                $("#studentclass").focus();
                return "";
            }
            var studentbirthdate = $("#studentbirthdate").val();
            if (studentbirthdate === "") {
                alert("student birth date is Required for validation");
                $("#studentbirthdate").focus();
                return "";
            }
            var studentaddress = $("#studentaddress").val();
            if (studentaddress === "") {
                alert("student address is Required for validation");
                $("#studentaddress").focus();
                return "";
            }
            var studentEnrollmentdate = $("#studentEnrollmentdate").val();
            if (studentEnrollmentdate === "") {
                alert("student Enrollment date is Required for validation ");
                $("#studentEnrollmentdate").focus();
                return "";
            }
            var jsonStrObj = {
                id: studentrollno ,
                name:studentfullName ,
                class: studentclass,
                birthdate:studentbirthdate,
                address:studentaddress,
                enrollmentdate:studentEnrollmentdate
            };
            return JSON.stringify(jsonStrObj);
        }
        
function getRollno() {
            var studentrollnoJsonObj = getstudentrollnoasjsonobj();
            var getRequest = createGET_BY_KEYRequest(connToken, dbName, relName , studentrollnoJsonObj);
            jQuery.ajaxSetup({async: false});
            var resultObj = executeCommandAtGivenBaseUrl(getRequest,
            jpdbBaseURL,jpdbIRL);
            jQuery.ajaxSetup({async: true});
            if(resultObj.status === 400){
                $('#save').prop('disabled',false);
                $('#reset').prop('disabled',false);
                $('#studentfullName').focus();
                
            }else if (resultObj.status === 200){
                $('#studentrollno').prop('disabled',true);
                fillData(resultObj);
                $('#update').prop('disabled',false);
                $('#reset').prop('disabled',false);
                $('#studentfullName').focus();
            }
        }


function saveStudent() {
            var jsonStr0bj = validateData();
            if (jsonStr0bj === "") {
                return "";
            }
            var putRequest = createPUTRequest(connToken, jsonStr0bj, dbName, relName);
            jQuery.ajaxSetup({async: false});
            var resultObj = executeCommandAtGivenBaseUrl(putRequest,
            jpdbBaseURL,jpdbIML);
            jQuery.ajaxSetup({async: true});
            resetForm();
            $("#studentrollno").focus();
        }
function updateStudent() {
            $('#update').prop("disabled",true);
            jsonupdate = validateData();
            var updateRequest = createUPDATERecordRequest(connToken, jsonupdate, dbName, relName,localStorage.getItem('recordno'));
            jQuery.ajaxSetup({async: false});
            var resultObj = executeCommandAtGivenBaseUrl(updateRequest,
            jpdbBaseURL,jpdbIML);
            jQuery.ajaxSetup({async: true});
            console.log(resultObj);
            resetForm();
            $("#studentrollno").focus();
        }