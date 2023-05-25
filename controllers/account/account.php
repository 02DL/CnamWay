<?php
if (connected()) {
    if($_SESSION['username'] != getAdminMail()) {
        redirect('account/user'); 
    }else{
        redirect('account/admin'); 
    }
}
?>
 