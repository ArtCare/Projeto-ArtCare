create database ArtCare;
use ArtCare;


create table verificacao (
	idVerificacao int primary key auto_increment,
    tempMax decimal(4,2) not null,
    tempMin decimal(4,2) not null,
    umiMax decimal(4,2) not null,
    umiMin decimal(4,2) not null
);

create table endereco (
	idEndereco int primary key auto_increment,
    cep char(9) not null,
    numEnd varchar(45) not null,
    complemento varchar(60)
);

create table museu (
	idMuseu int primary key auto_increment,
    fkEndereco int,
    nome varchar(45) not null,
    cnpj char(14) not null unique,
    rm char(9) not null unique,
    constraint fkEnderecoCliente foreign key (fkEndereco) references endereco (idEndereco)
);

create table representante (
idRepresentante int,
fkMuseu int,
	constraint pkRepresentanteMuseu primary key (idRepresentante, fkMuseu),
    constraint fkMuseuRepresentante foreign key (fkMuseu)
		references museu(idMuseu),
nome varchar(45) not null,
email varchar(256) not null,
senha varchar(45) not null
);

create table sensor (
	idSensor int primary key auto_increment,
    nome char(5) default 'dht11',
    tipo varchar(45) default 'temperatura, umidade',
    constraint chkNomeSensor check (nome in ('dht11'))
);

create table supervisor (
	idSupervisor int primary key auto_increment,
    nome varchar(45) not null,
    email varchar(256) not null,
    senha varchar(45) not null,
    permissao char(3) not null default 'não',
    constraint chkPermissaoSupervisor check (permissao in ('sim', 'não'))
);

create table setor (
	idSetor int auto_increment,
    fkSensor int,
    fkMuseu int,
    fkVerificacao int,
    nome varchar(45) not null,
    andar int not null,
    constraint pkCompostaSetor primary key (idSetor, fkSensor, fkMuseu, fkVerificacao),
    constraint fkSensorDoSetor foreign key (fkSensor) references sensor (idSensor),
    constraint fkMuseuDoSetor foreign key (fkMuseu) references museu (idMuseu),
    constraint fkVerificacaoDoSetor foreign key (fkVerificacao) references verificacao (idVerificacao)
);

create table visualizacao (
idVisualizacao int auto_increment,
fkSetor int,
fkSensor int,
fkMuseu int,
fkSupervisor int,
	constraint pkCompostaVisualizacao primary key (idVisualizacao, fkSetor, fkSensor, fkMuseu, fkSupervisor),
    constraint fkSetorVisualizacao foreign key (fkSetor) references setor(idSetor),
    constraint fkSensorVisualizacao foreign key (fkSensor) references sensor(idSensor),
    constraint fkMuseuVisualizacao foreign key (fkMuseu) references museu(idMuseu),
    constraint fkSupervisor foreign key (fkSupervisor) references supervisor(idSupervisor)
);

create table relatorio2 (
idRelatorio int
);

create table relatorio (
idRelatorio int auto_increment primary key,
fkSupervisor int,
fkSetor int,
dataHora datetime,
constraint fkRelatorioSupervisor foreign key (fkSupervisor) references supervisor(idSupervisor),
constraint fkrelatorioSetor foreign key (fkSetor) references setor(idSetor)
);

create table registro (
	idRegistro int auto_increment,
    fkSensor int,
    umidade decimal(4,2),
    temperatura decimal(4,2),
    dtRegistro timestamp not null default current_timestamp,
    constraint pkCompostaRegistro primary key (idRegistro, fkSensor),
    constraint fkSensorRegistro foreign key (fkSensor) references sensor (idSensor)
);

desc registro;
-- Necessário alterar INSERTS e SELECTS
insert into verificacao (tempMax, tempMin, umiMax, umiMin) values
(20.00, 18.00, 45.00, 40.00);

insert into endereco (cep, numEnd, complemento) values
('08140-060', '979', 'próximo à avenida paulista');

insert into museu (fkEndereco, nome, cnpj, rm) values
(1, 'masp', '12345678909876', '520485530');

insert into representante (fkMuseu, nome, email, senha) values 
(1, "Julia", "juliaararipe@gmail.com", "12345678");

insert into sensor (nome, tipo) values
('dht11', 'temperatura, umidade');

insert into supervisor (nome, email, senha, permissao) values
('bruno', 'bruno.oliveira@gmail.com', 'Bruninho321', 'sim');

insert into setor (fkSensor, fkMuseu, fkVerificacao, nome, andar) values
(1, 1, 1, 'galeria de arte', 12);

insert into registro (fkSensor, umidade, temperatura) values
(1, 20.00, 42.00);

desc relatorio;

insert into relatorio (fkSupervisor, fkSetor, dataHora) values
(1, 1, "2024-05-10 10:30:00"),
(1, 1, "2024-05-10 16:30:00"),
(1, 1, "2024-05-10 20:00:00"),
(1, 1, "2024-05-11 03:30:00"),
(1, 1, "2024-05-11 09:30:00"),
(1, 1, "2024-05-11 10:00:00"),
(1, 1, "2024-05-12 16:50:00"),
(1, 1, "2024-05-12 07:30:00"),
(1, 1, "2024-04-12 07:40:00"),
(1, 1, "2024-05-13 17:30:00"),
(1, 1, "2024-05-13 18:30:00"),
(1, 1, "2024-05-13 20:00:00");
select * from museu;
select * from endereco;
select * from supervisor;
select * from relatorio;
select * from setor;
select * from sensor;
select * from registro;
select * from verificacao;

select supervisor.nome as "Nome do Supervisor", setor.nome as "nome do Setor", dataHora from relatorio JOIN supervisor ON fkSupervisor = idSupervisor
	JOIN setor ON fkSetor = idSetor;
    

select supervisor.nome as "Nome do Supervisor", setor.nome as "nome do Setor", dataHora from relatorio JOIN supervisor ON fkSupervisor = idSupervisor
	JOIN setor ON fkSetor = idSetor where dataHora = "2024-05-13 20:00:00";

select setor.idSetor, setor.nome, umidade, temperatura from setor JOIN sensor on fkSensor = idSensor
	JOIN registro ON sensor.idSensor = registro.fkSensor where dtRegistro = "2024-05-26 19:41:27";

SELECT idMuseu FROM museu ORDER BY idMuseu DESC LIMIT 1;

select idSetor, nome, statusSetor from setor order by statusSetor DESC;

select * from setor where statusSetor = 3;
select count(statusSetor) from setor where statusSetor = 2;

select round((umidade),0), round((temperatura),0) 
	from setor join sensor on setor.fkSensor = idSensor 
		join registro on registro.fkSensor = idSensor where idSetor = 3 order by idRegistro DESC limit 1;
        
alter table verificacao
add column alertaTempMax decimal(4,2);

alter table verificacao
add column alertaTempMin decimal(4,2);

alter table verificacao
add column alertaUmiMax decimal(4,2);

alter table verificacao
add column alertaUmiMin decimal(4,2);