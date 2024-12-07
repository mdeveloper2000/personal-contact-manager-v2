<?php 
    require_once("./partials/header.php");
    $id_show = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);
?>

<div class="container">
    <?php require_once("./partials/title.php"); ?>
    </div>    
    <main>
        <input type="hidden" name="id_show" id="id_show" value="<?= $id_show ?>">
        <div class="flex two grow">
            <article class="card gallery">
                <div class="tabs"></div>
            </article>
            <article class="card third">
                <div class="label full left-0">
                    <h2>Informações</h2>
                </div>
                <footer>
                    <div style="text-align: end;">
                        <button class="warning" onclick="window.location.href='edit.php?id=<?=$id_show?>'">
                            Editar informações
                        </button>
                    </div>
                    <div class="show-information">
                        <i><h2 id="name"></h2></i>
                        <h3 id="phone"></h3>
                        <h3 id="email"></h3>
                        <div class="label flex"><h3 id="annotations"></h3></div>
                    </div>
                </footer>
            </article>
        </div>
    </main>
    <?php include_once("./partials/footer.php"); ?>
</div>

<script src="../assets/js/show.js"></script>