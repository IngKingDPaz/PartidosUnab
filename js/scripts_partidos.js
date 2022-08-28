var Id_reg = getParameterByName('Id');
var user_id = getParameterByName('user_id');
console.log(user_id)
console.log(Id_reg)
MostrarEquipos()
function Home(){

  location.href='MenuInicial.html?user_id='+user_id

}

function RegistroPartidos()
{
    location.href='Registrar_Partido.html?user_id='+user_id

}


function RegistrarUser()
{
    var formData = $("form").serializeArray()
    var datos={ "UserName":$("#UserName").val(),
                "Password":$("#Password").val(),
                "Nombre":$("#Nombre").val(),
                "Correo":$("#Correo").val()
              
              
            }
    console.log(datos)

   $.ajax({
      type: "POST",
      url: "http://localhost:3002/insertar_User",
      data: datos,    
      dataType: "json",
      success: function(data){    
         console.log(data) 
            if(data.save==1)
            { 
                  console.log('exitos')
                  alert('User Almacenado Satisfactoriamente')
                  location.href='index.html'
            }
            else
            {console.log('No')

                alert('Debe Ingresar los valores Solicitados')
            }
      }


    });


}


function Ingresar()
{

    var formData = $("form").serializeArray()
    var datos={ "UserName":$("#UserName").val(),
                "Password":$("#Password").val() 
              
            }


    console.log(datos)


      $.ajax({
      type: "post",
      url: "http://localhost:3002/ShoWhere",
      data:datos ,    
      dataType: "json",
      success: function(data){   
         console.log(data) 

            if(data.existe==1)
            { 
                 
                location.href='MenuInicial.html?user_id='+data.userid
            
 
            }
            else
            {console.log('No')

                alert('Usuario y/o password Incorrectos Validar')
            }
      }


    });


}



function VerPartidos()
{
  

    var x={"num":123};
    console.log(x)

 var game=''
      $.ajax({
      type: "post",
      url: "http://localhost:3002/Todos",
      data:x ,    
      dataType: "json",
      success: function(data){   
         console.log(data) 

var cant=0
            if(data.result.length>0)
            { 
                for(i=0;i<data.result.length;i++)
                {

                     $('#gm').remove();

                }
        
                for (i=0;i<data.result.length;i++)
                {
                   var fecha= new Date(data.result[i].Fecha).toLocaleDateString()

                  
                    game= fecha+' '+data.result[i].UserName+' '+ data.result[i].LOCAL+' ('+data.result[i].GOLes_Local+ ") VS ("+data.result[i].GOLes_Visitante+') '+data.result[i].VISITANTE+'\n'
                      if(data.result[i].GOLes_Local==null && data.result[i].GOLes_Visitante==null)
                      {
                           $('#games').append('<input type="button" id="gm" onclick="actualizarPartido('+data.result[i].id+')" value="Update">');
                           $('#games').append('<span id="gm">'+'&nbsp &nbsp'+game+'</span>');                        
                           $('#games').append('<br></br>');



                      }
                      else
                      { $('#games').append('<p id="gm">'+game+'</p>');}    
                        console.log(game)                   
                }
                     $('#showpartidos').show();
                     $('#verpartidos_').prop('disabled', true);
                    
                     
                
 
            }
            else
            {console.log('No')

                alert('No hay registros de Partidos hasta la Fecha')
            }
      }


    });

    
    
}

function actualizarPartido(idReg)
{

      
        location.href='Actualizar_Partido.html?user_id='+user_id+'&Id='+idReg
}


function UpdatePartido()
{

    var formData = $("form").serializeArray()
    var datos={ "Gol_l":$("#Gol_l").val(),
                "Gol_v":$("#Gol_v").val(),
                "Id_reg":Id_reg              
            }
         console.log(datos)

    $.ajax({
      type: "POST",
      url: "http://localhost:3002/update",
      data: datos,    
      dataType: "json",
      success: function(data){    
         console.log(data) 
            if(data.save==1)
            { 
                  console.log('exitos')
                  alert('Partido Actualizado Satisfactoriamente')
                  location.href='MenuInicial.html?user_id='+user_id
            }
            else
            {console.log('No')

                alert('Debe Ingresar los valores Solicitados')
            }
      }


    });

}

function RegistrarPartidos()
{

    var formData = $("form").serializeArray()
    var datos={ "Fecha":$("#Fecha").val(),
                "local":$("#local").val(),
                "visitante":$("#visitante").val(),
                "Gol_l":$("#Gol_l").val(),
                "Gol_v":$("#Gol_v").val(),
                "user_id":user_id
              
            }
         console.log(datos)

    $.ajax({
      type: "POST",
      url: "http://localhost:3002/insertar_registros",
      data: datos,    
      dataType: "json",
      success: function(data){    
         console.log(data) 
            if(data.save==1)
            { 
                  console.log('exitos')
                  alert('Partido Almacenado Satisfactoriamente')
                  location.href='MenuInicial.html?user_id='+user_id
            }
            else
            {console.log('No')

                alert('Debe Ingresar los valores Solicitados')
            }
      }


    });

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



function MostrarEquipos()
{
  

    var x={"num":123};
    console.log(x)

 var game=''
      $.ajax({
      type: "post",
      url: "http://localhost:3002/MostrarEquipos",
      data:x ,    
      dataType: "json",
      success: function(data){   
         console.log(data) 
            if(data.result.length>0)
            {                        
                for (i=0;i<data.result.length;i++)
                {
                          $('#local').append('<option value="'+data.result[i].Id+'">'+data.result[i].Nombre+'</option>');   
                          $('#visitante').append('<option value="'+data.result[i].Id+'">'+data.result[i].Nombre+'</option>');                         

                  
                }         
 
            }
            else
            {console.log('No')

                alert('Debe Ingresar los valores Solicitados')
            }
      }


    });

    
    
}


module.exports.RegistrarPartidos=RegistrarPartidos;
