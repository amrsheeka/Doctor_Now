<?php
function filterRequest($requestname)
{
    if (!empty($_POST[$requestname])) {
        return trim(htmlspecialchars(strip_tags($_POST[$requestname])));
    }
}
//+/c4rZR8y~bt9pk