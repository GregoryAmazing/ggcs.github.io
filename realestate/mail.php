<?php
// the message
$msg = $_POST['msg'];
$to = $_POST['name'];

echo 'sending email..';

// send email
//запись на семинар - нижняя кнопка
//назначена встреча - верхняя кнопка
mail("gregoryromanovsky225@gmail.com","Meeting","test 123");
?>