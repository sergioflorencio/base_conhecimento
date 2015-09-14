<?php


	$servidor="127.0.0.1";
	$usuario="root";
	$senha="";
	$schema="base_conhecimento";

	$conexao=mysql_connect($servidor,$usuario,$senha)  or die(mysql_error());

	date_default_timezone_set('America/Sao_Paulo');
	$inicio=date("d/m/Y H:i:s");




?>
