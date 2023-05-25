<?php
setcookie('incidentDeclare', '', time() - 3600);
redirect('account/admin');
?>