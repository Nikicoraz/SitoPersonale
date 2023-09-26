<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nikicoraz</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome</h1>
    <div id="bio">
        My name is Nicola, also known as Nikicoraz. I'm an italian programmer and I <em>sometimes</em> do stuff. Also Arch Linux enjoyer.
    </div>
    <h2>Some random pages that I have made:</h2>
    <?php
    // $dirPath contain path to directory whose files are to be listed 

    $files = scandir(".");  
    foreach ($files as $file) {
        if(!is_file($file) && $file != "." && $file != ".."){
            echo "<a href='" . $file . "'>" . $file ."</a><br>";
        }
    }
    ?>
</body>
</html>