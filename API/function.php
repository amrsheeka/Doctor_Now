<?php
function filterRequest($requestname)
{
    if (!empty($_POST[$requestname])) {
        return trim(htmlspecialchars(strip_tags($_POST[$requestname])));
    }
}
