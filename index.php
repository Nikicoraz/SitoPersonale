<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Nikicoraz</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <p id="froge">Professional Froge</p>
    <h1>Welcome</h1>
    <div id="bio">
        <p>
            My name is Nicola, also known as Nikicoraz. I'm an italian programmer and I <em>sometimes</em> do stuff.
        </p>
        <p>I have a raspberry running docker and a lot of services like Jellyfin, Bitwarden ecc.</p>
        <p>I've used a lot of <a href="programming.html">programming languages</a>, but the ones I used the most are C, C#, Java, Python, HTML, CSS, JavaScript.</p>
        <p>Check out my <a href="https://github.com/Nikicoraz">Github</a> for a lot of <em>(unfinished)</em> projects ;)</p>
        <p>Also I use arch btw.</p>
    </div>
    <h2>Some random pages that I have made:</h2>
    <?php
    // $dirPath contain path to directory whose files are to be listed 

    $files = scandir(".");  
    foreach ($files as $file) {
        if(!is_file($file) && $file != "." && $file != ".." && $file != ".git"){
            echo "<a href='" . $file . "'>" . $file ."</a><br>";
        }
    }
    ?>
    <footer>
        <h3>Contacts</h3>
        <p>Email: nicolacorato05@gmail.com</p>
        <p>Discord: @nikicoraz</p>
    </footer>
</body>
</html>