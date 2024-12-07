<?php require_once("./partials/header.php"); ?>

<div class="container">
    <?php require_once("./partials/title.php"); ?>
        <input type="search" id="searchInput" placeholder="Pesquisar nome" title="Informe o nome e pressione ENTER para pesquisar">
    </div>  
    <main>
        <div>
            <a href="create.php" class="button success">Novo Contato</a>
        </div>        
        <table>
        <thead>
            <tr>
                <th class="name">Nome</th>
                <th>Telefone</th>                
                <th colspan="3" class="actions">Ações</th>
            </tr>
        </thead>
        <tbody></tbody>
        <tfoot>
            <th colspan="5"></th>
        </tfoot>
    </table>
    <div class="modal">
        <input type="hidden" id="delete_id">
        <input id="modalDelete" type="checkbox">
        <label for="modalDelete" class="overlay"></label>
        <article>
            <header>
                <h3>Aviso</h3>
                <label for="modalDelete" class="close">&times;</label>
            </header>
            <section class="content"></section>
            <footer>
                <button class="button" onclick="document.getElementById('modalDelete').checked = false">Não</button>
                <label for="modalDelete" class="button dangerous" onclick="deleteContact()">Sim, deletar</label>
            </footer>
        </article>
    </div>
    </main>
    <?php include_once("./partials/footer.php"); ?>    
</div>

<script src="../assets/js/index.js"></script>
<script src="../assets/js/search.js"></script>

</body>

</html>