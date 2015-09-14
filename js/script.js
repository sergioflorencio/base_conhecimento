
function formatar_data(a){
	valor=a.value;
	a.value='';
	valor = valor.replace( "-", "" );
	valor = valor.replace( ",", "" );
	valor = valor.replace( ".", "" );
	valor = valor.replace( "/", "" );
	valor = valor.replace( "/", "" );
	valor = valor.replace( "/", "" );
	valor = valor.replace( "/", "" );
	valor = valor.replace( "/", "" );
	valor = valor.replace( "/", "" );
	valor = valor.replace( "(", "" );
	valor = valor.replace( ")", "" );
	valor = valor.replace( " ", "" );


	dia=valor.substring(0, 2);
	mes=valor.substring(2, 4);
	ano=valor.substring(4, 8);

	//alert(dia);
	a.value= dia+"/"+mes+"/"+ano;
	//a.value= valor;


}

function ajax(id_responseText, metodo, url,formData){
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function()
			{
				if(xhr.readyState == 4 && xhr.status == 200)
				{
					document.getElementById(id_responseText).innerHTML=xhr.responseText;
				}
			}			
			xhr.open(metodo, url);
			xhr.send(formData);
}
function ajax_add(id_responseText, metodo, url,formData){
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function()
			{
				if(xhr.readyState == 4 && xhr.status == 200)
				{
					document.getElementById(id_responseText).innerHTML+=xhr.responseText;alert(xhr.responseText);
				}
			}			
			xhr.open(metodo, url);
			xhr.send(formData);
}




function pesquisacep(){
		id_responseText="";
		metodo="POST";
		url="php/correios.php";
		var formData = new FormData();
		formData.append('metodo', 'cep');
		formData.append('filtro', this.value);

		ajax(id_responseText, metodo, url,formData);

}


function exportar(formato,id_grid,base){
		document.getElementById("arquivo_gerado").innerHTML="";
		var formData = new FormData();
		formData.append('formato', formato);
		formData.append('base', base);


		if(base=='html'){
		_table_headers=id_grid+"_table_headers";
		_table=id_grid+"_table";
		_table_footers=id_grid+"_table_footers";
			var tabela="<table>"+document.getElementById(_table_headers).innerHTML+"</table>";
				tabela+="<table>"+document.getElementById(_table).innerHTML+"</table>";
				tabela+="<table>"+document.getElementById(_table_footers).innerHTML+"</table>";
			formData.append('json', tabela);
		}		
		if(base=='json'){
			formData.append('json', JSON.stringify($( "#"+id_grid ).igGrid("option", "dataSource")));
		}		
			
		var xhr = new XMLHttpRequest();

		
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4 && xhr.status == 200)
			{
				document.getElementById("arquivo_gerado").innerHTML=xhr.responseText;

			}
		}
		
		xhr.open("POST", 'php/temp/exportar.php');
		xhr.send(formData);	
}

function upload_fotos(){
		var cod_item=document.getElementById("cod_item").value; 
				if (document.getElementById("imagem").files[0]!=undefined){
			var formData = new FormData();
			formData.append('my_uploaded_file', document.getElementById("imagem").files[0]);
			formData.append('cod_item',cod_item);
			var xhr = new XMLHttpRequest();

			
			xhr.onreadystatechange = function()
			{
				if(xhr.readyState == 4 && xhr.status == 200)
				{
					document.getElementById("imagens_").innerHTML=xhr.responseText;
				}
			}
			
			xhr.open("POST", 'php/upload_imagem.php');
			xhr.send(formData);

		}
}
function excluir_fotos(cod_imagem){
			var cod_item=document.getElementById("cod_item").value; 
			var formData = new FormData();
			formData.append('cod_imagem',cod_imagem);
			formData.append('cod_item',cod_item);
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function()
			{
				if(xhr.readyState == 4 && xhr.status == 200)
				{
					document.getElementById("imagens_").innerHTML=xhr.responseText;
				}
			}			
			xhr.open("POST", 'php/excluir_imagem.php');
			xhr.send(formData);

}


$('#bt_cad_curriculo_materias').click(function(){
	id_responseText="div_curriculo_materias";
	metodo="POST"
	url="php/incluir_cad_curriculo_materias.php";
	var formData = new FormData();
		formData.append('cod_curriculo',document.getElementById("cod_curriculo").value);
		formData.append('cod_materia',document.getElementById("cod_materia").value);
	ajax(id_responseText, metodo, url,formData);

});


//	$('.bt_excluir_curriculo_materias').addClass("uk-button-danger");
$(document).ready(function(){

});

function excluir_curriculo_materias(id){

	id_responseText="div_curriculo_materias";
	metodo="POST";
	url="php/excluir_cad_curriculo_materias.php";
	var formData = new FormData();
		formData.append('cod_curriculo',document.getElementById("cod_curriculo").value);
		formData.append('cod_curriculo_materias',id);
	ajax(id_responseText, metodo, url,formData);
	

}

function incluir_cad_turma_alunos(id){

	id_responseText="div_cad_turma_alunos";
	metodo="POST";
	url="php/incluir_cad_turma_alunos.php";
	var formData = new FormData();
		formData.append('cod_turma',document.getElementById("cod_turma").value);
		formData.append('cod_aluno',id);
	ajax(id_responseText, metodo, url,formData);
}

function excluir_cad_turma_alunos(id){

	id_responseText="div_cad_turma_alunos";
	metodo="POST";
	url="php/excluir_cad_turma_alunos.php";
	var formData = new FormData();
		formData.append('cod_turma',document.getElementById("cod_turma").value);	
		formData.append('cod_turma_alunos',id);
	ajax(id_responseText, metodo, url,formData);
	

}

$('#cod_turma').change(function(){
	id_responseText="div_curriculo_materias";
	metodo="POST";
	url="php/incluir_cad_curriculo_materias.php";
	var formData = new FormData();
		formData.append('cod_curriculo',document.getElementById("cod_curriculo").value);
		formData.append('cod_materia',document.getElementById("cod_materia").value);
	ajax(id_responseText, metodo, url,formData);

});

$('#bt_salvar_nota').click(function(){
		$("#grid").igGrid("commit");
			id_responseText="grid";
			metodo="POST"
			url="php/salvar_nota.php";
		var formData = new FormData();
			formData.append("json", JSON.stringify($("#grid").data("igGrid").dataSource.data()));
			formData.append("cod_turma", document.getElementById("cod_turma").value);
			formData.append('cod_curriculo_materias',document.getElementById("cod_curriculo_materias").value);
			ajax(id_responseText, metodo, url,formData);	
});

$("#foto_").click(function() {
    $("#my_file").click();
});
$("#my_file").change(function(){
			id_responseText="foto_";
			metodo="POST"
			url="php/upload_foto.php";
		var formData = new FormData();
			formData.append("foto", $('#my_file')[0].files[0]);
			formData.append("cod_aluno", document.getElementById("cod_aluno").value);
			ajax(id_responseText, metodo, url,formData);	


});
$("#bt_nova_resposta_formulario").click(function(){
			id_responseText="ul_respotas_formulario";
			metodo="POST"
			url="php/classes_formulario.php";
			texto_inicial=document.getElementById(id_responseText).innerHTML;
		var formData = new FormData();
			formData.append("act", 'nova_resposta');
			formData.append("cod_formulario", document.getElementById("cod_formulario").value);
			ajax(id_responseText, metodo, url,formData);
});
function excluir_resposta(a){
			id_responseText="ul_respotas_formulario";
			metodo="POST"
			url="php/classes_formulario.php";

		var formData = new FormData();
			formData.append("act", 'excluir_resposta');
			formData.append("cod_formulario", document.getElementById("cod_formulario").value);			
			formData.append("cod_formulario_resposta", a.getAttribute("cod_formulario_resposta"));
			ajax(id_responseText, metodo, url,formData);

}


function salvar_resposta(a){
			id_responseText="ul_respotas_formulario";
			metodo="POST"
			url="php/classes_formulario.php";

		var formData = new FormData();
			formData.append("act", 'salvar_resposta');
			formData.append("cod_formulario_resposta", a.id);
			formData.append("cod_formulario", document.getElementById("cod_formulario").value);
			formData.append("descricao", a.value);
			ajax(id_responseText, metodo, url,formData);


}
function editar_formulario(x){
	//this.getAttribute("cod_formulario")
			function destroy(){
				var divs=document.getElementsByClassName("div_editar_formulario");
				for (var a=0;a<divs.length;a++){
					document.getElementById(divs[a].id).innerHTML="";	
				}
			}
	
			id_responseText="div_editar_formulario_"+x.getAttribute("cod_formulario");
			metodo="POST"
			url="php/classes_formulario.php";

		var formData = new FormData();
			formData.append("act", 'editar_formulario');
			formData.append("cod_formulario", x.getAttribute("cod_formulario"));
			destroy();
			ajax(id_responseText, metodo, url,formData);
}

function salvar_formulario(){
			id_responseText="pergunta_formulario";
			metodo="POST"
			url="php/classes_formulario.php";

		var formData = new FormData();
			formData.append("act", 'salvar_formulario');
			formData.append("cod_formulario", document.getElementById("cod_formulario").value);
			formData.append("texto_pergunta", document.getElementById("texto_pergunta").value);
			formData.append("texto_ajuda", document.getElementById("texto_ajuda").value);
			formData.append("tipo_formulario",  document.getElementById("tipo_formulario").value);
			ajax(id_responseText, metodo, url,formData);


}
function novo_formulario(){
	//this.getAttribute("cod_formulario")
			function destroy(){
				var divs=document.getElementsByClassName("div_editar_formulario");
				for (var a=0;a<divs.length;a++){
					document.getElementById(divs[a].id).innerHTML="";	
				}
			}
	
			id_responseText="div_editar_formulario_";
			metodo="POST"
			url="php/classes_formulario.php";

		var formData = new FormData();
			formData.append("act", 'novo_formulario');
			formData.append("cod_formulario", "");
			destroy();
			ajax(id_responseText, metodo, url,formData);

}
function cacelar_edicao_formulario(){
	id_responseText="div_editar_formulario_"+document.getElementById("cod_formulario").value;
	document.getElementById(id_responseText).innerHTML="";

}

$('.ficha_complementar').change(function(){
			id_responseText="";
			metodo="POST"
			url="php/classes_formulario.php";

		var formData = new FormData();
			formData.append("act", 'salvar_ficha_complementar');
			formData.append("cod_formulario_resposta", this.getAttribute("value"));
			formData.append("cod_formulario", this.getAttribute("name"));
			formData.append("cod_aluno", document.getElementById("cod_aluno").value);
			formData.append("tagName", this.tagName);
			formData.append("type", this.type);
			formData.append("texto", this.value);
			ajax(id_responseText, metodo, url,formData);


});
$('#tb_salvar_preceptoria').click(function(){
			id_responseText="preceptorias";
			metodo="POST"
			url="php/classes_preceptorias.php";

		var formData = new FormData();
			formData.append("act", 'salvar_ficha_complementar');
			formData.append("cod_aluno", document.getElementById("cod_aluno").value);
			formData.append("texto", document.getElementById("wysiwyg_nota").value);
			formData.append("cod_usuario", document.getElementById("cod_usuario").value);
			ajax(id_responseText, metodo, url,formData);
			document.getElementById("wysiwyg_nota").value="";


});
