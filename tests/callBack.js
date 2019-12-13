// var sum = [0, 1, 2, 3].forEach(function(ele, index) {

//  if(index==2) console.log(index)
// });


// function do_a(){
//   console.log( '`do_a`: this comes out first');
// }

// function do_a(){
//   // simulate a time consuming function
//   console.log('I am in a');
//   setTimeout( function(){
//     console.log( '`do_a`: this takes longer than `do_b`' );
//   }, 1000 );
// }

// function do_a(callback) {
//     // simulate a time consuming function
//     setTimeout(function() {
//         console.log('`do_a`: this takes longer than `do_b`');
//     }, 1000);
//     callback;
// }



// function do_b() {
//     console.log('`do_b`: this comes out later');
// }




// function do_a(){
//   // simulate a time consuming function
//   console.log('I am in a');
//   setTimeout( function(){
//     console.log( '`do_a`: this takes longer than `do_b`' );
//   }, 1000 );
// }


// function do_b(){
//   console.log( '`do_b`: this comes out later' );
// }

// do_a();
// do_b();

// // function do_b(){
// //   console.log( '`do_b`: tshi is supposed to come out after `do_a` but it comes out before `do_a`' );
// // }


// function do_a( callback ){
//   setTimeout( function(){
//     // simulate a time consuming function
//     console.log( '`do_a`: this takes longer than `do_b`' );

//     // if callback exist execute it
//     callback && callback();
//   }, 3000 );
// }

// function do_b(){
//   console.log( '`do_b`: now we can make sure `do_b` comes out after `do_a`' );
// }

// do_a( function(){
//   do_b();
// });


function createFile(callback){
	setTimeout( function(){
    console.log( '`Create File`' );
    callback();
  }, 3000 );
}

function ReadFile(callback){
	setTimeout( function(){
    console.log( '`Read File`' );
    callback()
  }, 2000 );
}

function CopyFile(callback){
	setTimeout( function(){
    console.log( '`Copy File`' );
    callback();
  }, 1000 );
}


function deleteFile(){
	setTimeout( function(){
    console.log( '`Delete File`' );
  }, 500 );
}


createFile(function(){ReadFile(function(){CopyFile(function(){deleteFile()})})});
// do_a( function(){
//   do_b();
// });
