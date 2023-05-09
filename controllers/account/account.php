<?php
if (connected()) {
    if($_SESSION['username'] != "admin@mail.com") {
        redirect('account/user'); 
    }else{
        redirect('account/admin'); 
    }
}
?>
 